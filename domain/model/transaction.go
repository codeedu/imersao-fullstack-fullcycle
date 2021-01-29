package model

import (
	"errors"
	"github.com/asaskevich/govalidator"
	uuid "github.com/satori/go.uuid"
	"time"
)

const (
	TransactionPending   string = "pending"
	TransactionCompleted string = "completed"
	TransactionError     string = "error"
	TransactionConfirmed string = "confirmed"
)

type TransactionRepositoryInterface interface {
	Register(transaction *Transaction) error
	Save(transaction *Transaction) error
	Find(id string) (*Transaction, error)
}

type Transactions struct {
	Transaction []Transaction
}

type Transaction struct {
	Base              `valid:"required"`
	AccountFrom       *Account `valid:"-"`
	AccountFromID     string   `gorm:"column:account_from_id;type:uuid;" valid:"notnull"`
	Amount            float64  `json:"amount" gorm:"type:float" valid:"notnull"`
	PixKeyTo          *PixKey  `valid:"-"`
	PixKeyIdTo        string   `gorm:"column:pix_key_id_to;type:uuid;" valid:"notnull"`
	Status            string   `json:"status" gorm:"type:varchar(20)" valid:"notnull"`
	Description       string   `json:"description" gorm:"type:varchar(255)" valid:"-"`
	CancelDescription string   `json:"cancel_description" gorm:"type:varchar(255)" valid:"-"`
}

func init() {
	govalidator.SetFieldsRequiredByDefault(true)
}

func (t *Transaction) isValid() error {
	_, err := govalidator.ValidateStruct(t)

	if t.Amount <= 0 {
		return errors.New("the amount must be greater than 0")
	}

	if t.Status != TransactionPending && t.Status != TransactionCompleted && t.Status != TransactionError {
		return errors.New("invalid status for the transaction")
	}

	if t.PixKeyTo.AccountID == t.AccountFromID {
		return errors.New("the source and destination account cannot be the same")
	}

	if err != nil {
		return err
	}
	return nil
}

func (t *Transaction) Complete() error {
	t.Status = TransactionCompleted
	t.UpdatedAt = time.Now()
	err := t.isValid()
	return err
}

func (t *Transaction) Cancel(description string) error {
	t.Status = TransactionError
	t.CancelDescription = description
	t.UpdatedAt = time.Now()
	err := t.isValid()
	return err
}

func NewTransaction(accountFrom *Account, amount float64, pixKeyTo *PixKey, description string) (*Transaction, error) {
	transaction := Transaction{
		AccountFrom:   accountFrom,
		AccountFromID: accountFrom.ID,
		Amount:        amount,
		PixKeyTo:      pixKeyTo,
		PixKeyIdTo:    pixKeyTo.ID,
		Status:        TransactionPending,
		Description:   description,
	}
	transaction.ID = uuid.NewV4().String()
	transaction.CreatedAt = time.Now()
	err := transaction.isValid()
	if err != nil {
		return nil, err
	}
	return &transaction, nil
}
