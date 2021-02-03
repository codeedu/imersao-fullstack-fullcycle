/*
Copyright © 2021 NAME HERE <EMAIL ADDRESS>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package cmd

import (
	"github.com/codeedu/imersao/codepix-go/domain/model"
	"github.com/codeedu/imersao/codepix-go/infrastructure/db"
	"github.com/codeedu/imersao/codepix-go/infrastructure/repository"
	"github.com/spf13/cobra"
	"os"
)

// fixturesCmd represents the fixtures command
var fixturesCmd = &cobra.Command{
	Use:   "fixtures",
	Short: "Run fixtures for fake data generation",
	Run: func(cmd *cobra.Command, args []string) {
		database := db.ConnectDB(os.Getenv("env"))
		defer database.Close()
		pixRepository := repository.PixKeyRepositoryDb{Db: database}

		bankBBX, _ := model.NewBank("001", "BBX")
		bankCTER, _ := model.NewBank("002", "CTER")
		pixRepository.AddBank(bankBBX)
		pixRepository.AddBank(bankCTER)

		account1, _ := model.NewAccount(bankBBX, "1111", "User BBX 1")
		account1.ID = "6e4635ce-88d1-4e58-9597-d13fc446ee47"
		pixRepository.AddAccount(account1)

		account2, _ := model.NewAccount(bankBBX, "2222", "User BBX 2")
		account2.ID = "51a720b2-5144-4d7f-921d-57023b1e24c1"
		pixRepository.AddAccount(account2)

		account3, _ := model.NewAccount(bankCTER, "3333", "User CTER 1")
		account3.ID = "103cc632-78e7-4476-ab63-d5ad3a562d26"
		pixRepository.AddAccount(account3)

		account4, _ := model.NewAccount(bankCTER, "4444", "User CTER 2")
		account4.ID = "463b1b2a-b5fa-4b88-9c31-e5c894a20ae3"
		pixRepository.AddAccount(account4)
	},
}

func init() {
	rootCmd.AddCommand(fixturesCmd)
}
