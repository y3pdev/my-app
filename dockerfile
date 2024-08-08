# ใช้ node image
FROM node:14

# ตั้งค่าโฟลเดอร์ทำงานใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json เข้าไปใน container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดเข้าไปใน container
COPY . .

# เปิด port ที่จะใช้
EXPOSE 3000

# คำสั่งในการรันแอปพลิเคชัน
CMD ["npm", "start"]