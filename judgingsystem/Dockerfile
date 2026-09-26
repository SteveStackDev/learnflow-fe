# Sử dụng Ubuntu 22.04 LTS làm base image ổn định nhất cho hệ thống chấm bài
FROM ubuntu:22.04

# Thiết lập môi trường không tương tác và không buffer output log
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Cài đặt trọn bộ tất cả các trình biên dịch & runtime cần thiết:
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    g++ \
    gcc \
    openjdk-17-jdk-headless \
    nodejs \
    npm \
    curl \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Thiết lập JAVA_HOME tự động cho Linux
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Thư mục làm việc trong container
WORKDIR /app

# Cài đặt các thư viện Python Django
COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy toàn bộ code server vào container
COPY . /app/

# Mở cổng 8000
EXPOSE 8000

# Khởi động Django server lắng nghe tất cả các IP (dùng --noreload để tránh crash thread trong Docker)
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000", "--noreload"]
