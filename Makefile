# Makefile

# Default target executed when no arguments are given to make.
default: serve

# Target to run both servers
serve:
	@echo "Starting php artisan serve and npm run dev..."
	@$(MAKE) -j2 serve-laravel serve-react

# Target to run Laravel's development server
serve-laravel:
	@echo "Starting Laravel's development server..."
	@php artisan serve

# Target to run React's development server
serve-react:
	@echo "Starting React's development server..."
	@cd react && npm run dev

.PHONY: default serve serve-laravel serve-react
