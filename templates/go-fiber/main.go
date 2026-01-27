package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Name        string `json:"name" gorm:"not null"`
	Description string `json:"description"`
}

type CreateItemRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

var db *gorm.DB

func main() {
	_ = godotenv.Load()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://postgres:postgres@localhost:5432/app?sslmode=disable"
	}

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err := db.AutoMigrate(&Item{}); err != nil {
		log.Fatal("Failed to migrate:", err)
	}

	app := fiber.New()

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "healthy"})
	})

	app.Get("/items", listItems)
	app.Post("/items", createItem)
	app.Get("/items/:id", getItem)
	app.Delete("/items/:id", deleteItem)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Fatal(app.Listen(":" + port))
}

func listItems(c *fiber.Ctx) error {
	var items []Item
	db.Find(&items)
	return c.JSON(items)
}

func createItem(c *fiber.Ctx) error {
	var req CreateItemRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	item := Item{Name: req.Name, Description: req.Description}
	if result := db.Create(&item); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create item"})
	}

	return c.Status(201).JSON(item)
}

func getItem(c *fiber.Ctx) error {
	id := c.Params("id")
	var item Item
	if result := db.First(&item, id); result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Item not found"})
	}
	return c.JSON(item)
}

func deleteItem(c *fiber.Ctx) error {
	id := c.Params("id")
	if result := db.Delete(&Item{}, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete item"})
	}
	return c.JSON(fiber.Map{"status": "deleted"})
}
