# Build stage
FROM golang:1.25-alpine AS builder
WORKDIR /app
# Copy go.mod dan go.sum dulu agar cache lebih efisien
COPY go.mod go.sum ./
RUN go mod download
# Copy semua kode di folder backen
COPY . .
RUN go build -o main ./cmd/main.go 

# Run stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]