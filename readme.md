# 📊 Janata Wifi - Stock Market Data Management (React + Flask + MySQL)

## **📌 Overview**
This project is a **full-stack stock market data management system** built using **React (Frontend), Flask (Backend), and MySQL (Database)**. The system allows users to **add, edit, delete, and visualize stock market data**, incorporating **pagination, dynamic filtering, and multi-axis graphing** for efficient data handling.

---

## **📆 Project Timeline**
- **Received Project:** 📅 6th March  
- **Learning & Reviewing React and Flask:** 📖 8th to 11th March  
- **Project Completion:** 🚀 12th to 13th March  

---

## **📚 What I Learned**
### **1️⃣ Full-Stack Development Workflow**
- Setting up a **React-Frontend** and **Flask-Backend** from scratch.
- Managing **backend/frontend communication** via RESTful APIs.
- Implementing **CORS handling** to allow smooth data exchange.

### **2️⃣ SQL Integration & Data Handling**
- Connecting **Flask to MySQL** for efficient data storage.
- Importing **large datasets** from CSV and ensuring correct data types.
- Using **pagination** to improve performance when handling thousands of records.

### **3️⃣ CRUD Operations**
- **Create**: Added a **Stock Form** to insert new stock records.  
- **Read**: Implemented **tables & graph visualizations** with filters.  
- **Update**: Allowed inline **editing of stock records**.  
- **Delete**: Enabled row-based **removal of stock records**.

### **4️⃣ Advanced Graphing & Optimization**
- Used **Recharts** to create a **multi-axis stock chart**.
- Added **a dropdown to filter stocks by trade code**.
- Implemented **prefetching** to load **recent stock data first** and **full dataset in the background**.
- Applied **React Virtualization & Pagination** to handle large datasets efficiently.

---

## **⚡ Challenges Faced & How I Solved Them**
### **1️⃣ Backend & Frontend Compatibility**
🔹 **Issue**: Initial API calls were not working due to **CORS errors**.  
✅ **Solution**: Configured **Flask-CORS** to allow React to fetch data.

### **2️⃣ MySQL Data Import & Formatting**
🔹 **Issue**: CSV import failed due to **data truncation & format mismatches**.  
✅ **Solution**: Adjusted **MySQL column types** and **properly formatted the volume field**.

### **3️⃣ Graph Display Issues**
🔹 **Issue**: Graphs looked **distorted** due to **0-values in close/volume**.  
✅ **Solution**: Filtered out **invalid stock entries** before rendering.

### **4️⃣ Performance Bottlenecks**
🔹 **Issue**: Fetching **large datasets** made the UI lag.  
✅ **Solution**: Implemented **pagination & background prefetching**.

### **5️⃣ Update Operation Complexity**
🔹 **Issue**: Editing a table row dynamically while keeping UI responsive.  
✅ **Solution**: Used **React state management** to enable inline row editing.

---

## **🚀 Conclusion**
This project was a **deep dive into full-stack development**, requiring precise debugging and **back-and-forth problem-solving**. At times, it felt like performing **surgery with a scalpel**, carefully dissecting each issue while keeping the system stable.  

From **database integration** to **API design, dynamic filtering, and graphing**, this project reinforced **clean architecture, performance optimization, and data visualization techniques**.  

💡 **Final Takeaway:** **A great project is built through continuous iteration, calm debugging, and well-structured problem-solving.**

---
### **👨‍💻 Tech Stack Used**
✅ **Frontend:** React (Hooks, Fetch API)  
✅ **Backend:** Flask (REST API, Flask-CORS, MySQL Connector)  
✅ **Database:** MySQL (CRUD Operations, Data Optimization)  
✅ **Graphing:** Recharts (Multi-Axis Charts, Prefetching, Filtering)  

---

## **💾 How to Run This Project**
1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-repo-name.git
cd janataWifi
```
2️⃣ **Set up the Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
3️⃣ **Set up the Frontend**
```bash
cd frontend
npm install
npm start
```
4️⃣ **Open the app in your browser:**
📍 http://localhost:3000

**Thank you**