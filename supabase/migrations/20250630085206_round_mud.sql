-- Sunflower Academy Database Schema
-- SQLite database schema for the school website

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- 1. Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT 'Sunflower Academy',
    subtitle TEXT NOT NULL DEFAULT 'Inspiring Excellence Building Future',
    description TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    cta_button_text TEXT NOT NULL DEFAULT 'Explore Our Campus',
    cta_button_link TEXT NOT NULL DEFAULT '#about',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero content
INSERT OR REPLACE INTO hero_content (id, title, subtitle, description, hero_image, cta_button_text, cta_button_link) VALUES
(1, 'Sunflower Academy', 'Inspiring Excellence Building Future', 
'Sunflower Academy offers a well-rounded education that blends academic excellence with creativity, innovation, and real-world skills. With personalized mentoring, interactive classrooms, modern facilities and diverse extracurriculars, we nurture confident, responsible, and globally minded learners.',
'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
'Explore Our Campus', '#about');

-- 2. About Content Table
CREATE TABLE IF NOT EXISTS about_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vision_title TEXT NOT NULL DEFAULT 'Our Vision',
    vision_content TEXT NOT NULL,
    mission_title TEXT NOT NULL DEFAULT 'Our Mission',
    mission_content TEXT NOT NULL,
    core_values_title TEXT NOT NULL DEFAULT 'Our Core Values',
    history_title TEXT NOT NULL DEFAULT 'Our History',
    history_content TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default about content
INSERT OR REPLACE INTO about_content (id, vision_content, mission_content, history_content) VALUES
(1, 
'To be a leading institution recognized for academic excellence, holistic development, and innovation, empowering students to thrive as compassionate leaders and changemakers in a dynamic global community.',
'To be a leading institution recognized for academic excellence, holistic development, and innovation, empowering students to thrive as compassionate leaders and changemakers in a dynamic global community.',
'Sunflower Academy was established in 2061 B.S. with classes from Nursery to Grade 5, founded through the dedication and vision of Chairman Mr. Uddhab Bogati and Founder Member Mr. Ram Bahadur Gautam. Their efforts laid the groundwork for a school committed to academic excellence and holistic development.

The academy proudly celebrated its first batch of School Leaving Certificate (SLC) graduates in 2065 B.S. Over the years, Sunflower Academy has continued to grow in both size and reputation. In 2081 B.S., we marked a major milestone with the graduation of our 17th batch of Secondary Education Examination (SEE) students.

Today, more than 1,000 students are part of the Sunflower Academy family, learning in a nurturing and progressive environment. In recognition of our commitment to global standards, we were awarded the World Schools League certificate in 2081 B.S., officially recognizing Sunflower Academy as an international school.');

-- 3. Core Values Table
CREATE TABLE IF NOT EXISTS core_values (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Insert default core values
INSERT OR REPLACE INTO core_values (name, description, display_order) VALUES
('Excellence', 'Striving for the highest standards in everything we do.', 1),
('Integrity', 'Acting with honesty, ethics, and responsibility.', 2),
('Innovation', 'Embracing new ideas and approaches to learning.', 3),
('Respect', 'Respecting each others.', 4),
('Responsibility', 'Becoming a responsible citizen.', 5);

-- 4. Contact Information Table
CREATE TABLE IF NOT EXISTS contact_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT 'Contact Information',
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    map_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default contact info
INSERT OR REPLACE INTO contact_info (id, title, address, phone, email, map_url) VALUES
(1, 'Contact Information', 'Tarakeshwor- 06, KTM', '(977) 01-5136321', 'sfa2061@gmail.com',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4032.0402149898878!2d85.2998052!3d27.750960300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cce4ffffe7%3A0x161276d0d897c665!2sSunflower%20Academy%20(English%20Medium%20SS)!5e1!3m2!1sen!2snp!4v1750232702113!5m2!1sen!2snp');

-- 5. Facilities Content Table
CREATE TABLE IF NOT EXISTS facilities_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT 'World-Class Facilities',
    subtitle TEXT NOT NULL DEFAULT 'Creating the perfect environment for learning and growth',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default facilities content
INSERT OR REPLACE INTO facilities_content (id, title, subtitle) VALUES
(1, 'World-Class Facilities', 'Creating the perfect environment for learning and growth');

-- 6. Facilities Table
CREATE TABLE IF NOT EXISTS facilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'school',
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Insert default facilities
INSERT OR REPLACE INTO facilities (title, description, image_url, icon, display_order) VALUES
('Digital Classrooms', 'The digital classroom is equipped with advanced technology to enhance learning through interactive lessons, multimedia content, and online resources, creating an engaging and modern educational experience for students.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/presentation.jpg', 'computer', 1),
('Science Labs', 'Get your hands messy and your mind curious! From bubbling chemistry experiments to electrifying physics demos, our fully-equipped lab lets students bring science to life through hands-on learning and discovery.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/plantation.jpg', 'school', 2),
('Transportation', 'The school offers convenient transportation services to ensure a comfortable and efficient commute for students, minimizing travel time.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/school-line.jpg', 'users', 3),
('Spacious Playground', 'The campus includes a spacious playground with facilities for basketball, volleyball, skating, and futsal, offering students plenty of opportunities for sports and outdoor activities.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/futsal.jpg', 'users', 4);

-- 7. Activities Content Table
CREATE TABLE IF NOT EXISTS activities_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT 'Beyond Classroom',
    subtitle TEXT NOT NULL DEFAULT 'Take a virtual tour of our Activities',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default activities content
INSERT OR REPLACE INTO activities_content (id, title, subtitle) VALUES
(1, 'Beyond Classroom', 'Take a virtual tour of our Activities');

-- 8. Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Insert default activities
INSERT OR REPLACE INTO activities (title, image_url, display_order) VALUES
('Book Review', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/presentation.jpg', 1),
('Dance, Music and Arts', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/dance.jpg', 2),
('Futsal Ground & Basketball Court', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/futsal.jpg', 3),
('Roller Skating', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/scout.jpg', 4),
('Yoga and Meditation', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/plantation.jpg', 5),
('Swimming', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/swimming.jpg', 6),
('Field Trips', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/school-line.jpg', 7),
('School Clubs', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/scout.jpg', 8),
('Horse Riding', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/horseride.jpg', 9);

-- 9. Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Insert default gallery images
INSERT OR REPLACE INTO gallery_images (title, description, image_url, category, display_order) VALUES
('Futsal', 'Students participating in a futsal match.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/futsal.jpg', 'sports', 1),
('Dashain Celebration', 'Dashain celebration at school.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/dashain.jpg', 'celebration', 2),
('Library', 'Extensive collection of books, journals, and digital resources.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/presentation.jpg', 'labs', 3),
('Holi Celebration', 'Holi celebration at school.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/holi.jpg', 'celebration', 4),
('Health Checkup', 'Regular health checkup for students.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/checkup.jpg', 'checkup', 5),
('Sports', 'Spacious playground for outdoor activities and physical education.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/horseride.jpg', 'sports', 6),
('Annual Day Celebration', 'Students showcasing their talents during our annual day celebration.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/dance.jpg', 'events', 7),
('School Life', 'Students enjoying their time in our beautiful school environment.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/school-line.jpg', 'school life', 8),
('Activities', 'Students participating in collaborative learning sessions.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/scout.jpg', 'events', 9),
('Activities', 'Students conducting tree plantation program.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/plantation.jpg', 'labs', 10),
('Sports Day', 'Annual sports day celebrations with various athletic events.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/futsal.jpg', 'events', 11),
('Swimming', 'Interactive learning environment with modern educational technology.', 'https://raw.githubusercontent.com/nyoupaneroshan/SunflowerAcademy/refs/heads/main/public/swimming.jpg', 'events', 12);

-- 10. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default notifications
INSERT OR REPLACE INTO notifications (title, content, type, priority, is_active) VALUES
('World Schools League Certificate Awarded', 'Sunflower Academy has been officially recognized as an international school with the World Schools League certificate in 2081 B.S.', 'success', 'high', 1),
('SEE Results 2081', 'Congratulations to our 16th batch of SEE graduates! Excellent results achieved with 100% pass rate.', 'info', 'medium', 1);

-- 11. Education Content Table
CREATE TABLE IF NOT EXISTS education_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    curriculum_title TEXT NOT NULL DEFAULT 'Curriculum',
    curriculum_description TEXT NOT NULL,
    mentoring_title TEXT NOT NULL DEFAULT 'Personalized Mentoring',
    mentoring_description TEXT NOT NULL,
    classrooms_title TEXT NOT NULL DEFAULT 'Interactive Classrooms',
    classrooms_description TEXT NOT NULL,
    counseling_title TEXT NOT NULL DEFAULT 'Student Counseling',
    counseling_description TEXT NOT NULL,
    beyond_books_title TEXT NOT NULL DEFAULT 'Learning Beyond Books',
    beyond_books_description TEXT NOT NULL,
    grades_title TEXT NOT NULL DEFAULT 'Grades Offered',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default education content
INSERT OR REPLACE INTO education_content (id, curriculum_description, mentoring_description, classrooms_description, counseling_description, beyond_books_description) VALUES
(1,
'Balanced and diverse, emphasizing STEM, humanities, and life skills to prepare students for the real world.',
'Our dedicated mentors guide each student on a journey of self-discovery, identifying strengths and tackling challenges head-on. With personalized attention, we help unlock every individual''s full potential.',
'Our interactive classrooms are buzzing with discussions, creative brainstorming, and hands-on activities. It''s a dynamic environment where curiosity leads the way.',
'The teachers conduct classes while understanding the students'' classroom requirements. They hold frequent counseling sessions for students and inform the parents, highlighting the support needed from them as well.',
'By fostering creativity, resilience, and confidence, we prepare students not just for exams but for life itself — ready to rise to any challenge with determination and heart.');

-- 12. Grade Levels Table
CREATE TABLE IF NOT EXISTS grade_levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL,
    grades TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- Insert default grade levels
INSERT OR REPLACE INTO grade_levels (level, grades, display_order) VALUES
('Pre-Primary', 'Playgroup to UKg', 1),
('Basic', 'Grade 1 to Grade 8', 2),
('Secondary', 'Grade 9 to Grade 10', 3);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_facilities_order ON facilities(display_order);
CREATE INDEX IF NOT EXISTS idx_activities_order ON activities(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_notifications_active ON notifications(is_active);
CREATE INDEX IF NOT EXISTS idx_core_values_order ON core_values(display_order);
CREATE INDEX IF NOT EXISTS idx_grade_levels_order ON grade_levels(display_order);