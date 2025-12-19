create database New_BMI_Health_Tracker;
use New_BMI_Health_Tracker;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    gender ENUM('male','female'),
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE health_stats (
    stats_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    weight_in_kg DECIMAL(5,2) NOT NULL,
    height_in_cm DECIMAL(5,2) NOT NULL,
    bmi_value DECIMAL(4,2) NOT NULL,
    bmi_status ENUM('Underweight','Normal','Overweight','Obese') NOT NULL,
    date_recorded DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE daily_health_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    steps INT DEFAULT 0,
    calories_burned INT DEFAULT 0,
    water_intake_ml INT DEFAULT 0,
    sleep_hours DECIMAL(4,2),
    heart_rate INT,
    record_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
