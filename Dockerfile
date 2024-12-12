# Используем официальный образ Node.js
FROM node:18-alpine AS build

# Устанавливаем необходимые пакеты
RUN apk add --no-cache git

# Задаем рабочую директорию
WORKDIR /app

# Клонируем репозиторий
RUN git clone https://github.com/Goose-e/book_store_pro.git .

# Устанавливаем зависимости
RUN npm install

# Сборка приложения
RUN npm run build

# Используем Nginx для запуска приложения
FROM nginx:stable-alpine

# Копируем собранные файлы во внешний каталог Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Указываем порт, который будет использоваться
EXPOSE 5000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
