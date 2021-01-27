package model_test

import (
	"testing"

	uuid "github.com/satori/go.uuid"

	"github.com/codeedu/imersao/codepix-go/domain/model"
	"github.com/stretchr/testify/require"
)

func TestNewTransaction(t *testing.T) {
	code := "001"
	name := "Banco do Brasil"
	bank, _ := model.NewBank(code, name)

	accountNumber := "abcnumber"
	ownerName := "Wesley"
	account, _ := model.NewAccount(bank, accountNumber, ownerName)

	accountNumberDestination := "abcdestination"
	ownerName = "Mariana"
	accountDestination, _ := model.NewAccount(bank, accountNumberDestination, ownerName)

	kind := "email"
	key := "j@j.com"
	pixKey, _ := model.NewPixKey(kind, accountDestination, key)

	require.NotEqual(t, account.ID, accountDestination.ID)

	amount := 3.10
	statusTransaction := "pending"
	transaction, err := model.NewTransaction(account, amount, pixKey, "My description")
	//
	require.Nil(t, err)
	require.NotNil(t, uuid.FromStringOrNil(transaction.ID))
	require.Equal(t, transaction.Amount, amount)
	require.Equal(t, transaction.Status, statusTransaction)
	require.Equal(t, transaction.Description, "My description")
	require.Empty(t, transaction.CancelDescription)

	pixKeySameAccount, err := model.NewPixKey(kind, account, key)

	_, err = model.NewTransaction(account, amount, pixKeySameAccount, "My description")
	require.NotNil(t, err)

	_, err = model.NewTransaction(account, 0, pixKey, "My description")
	require.NotNil(t, err)

}

func TestModel_ChangeStatusOfATransaction(t *testing.T) {
	code := "001"
	name := "Banco do Brasil"
	bank, _ := model.NewBank(code, name)

	accountNumber := "abcnumber"
	ownerName := "Wesley"
	account, _ := model.NewAccount(bank, accountNumber, ownerName)

	accountNumberDestination := "abcdestination"
	ownerName = "Mariana"
	accountDestination, _ := model.NewAccount(bank, accountNumberDestination, ownerName)

	kind := "email"
	key := "j@j.com"
	pixKey, _ := model.NewPixKey(kind, accountDestination, key)

	amount := 3.10
	transaction, _ := model.NewTransaction(account, amount, pixKey, "My description")

	transaction.Complete()
	require.Equal(t, transaction.Status, model.TransactionCompleted)

	transaction.Cancel("Error")
	require.Equal(t, transaction.Status, model.TransactionError)
	require.Equal(t, transaction.CancelDescription, "Error")


}