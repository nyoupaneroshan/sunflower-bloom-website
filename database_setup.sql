
-- Sunflower Academy Database Setup Script
-- Run this in phpMyAdmin or your MySQL client

-- Create database (uncomment if needed)
-- CREATE DATABASE nepabets_sunflower;
-- USE nepabets_sunflower;

-- 1. Hero Content Table
CREATE TABLE IF NOT EXISTS `hero_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'Welcome to Sunflower Academy',
  `subtitle` varchar(255) NOT NULL DEFAULT 'Nurturing Young Minds for Tomorrow''s Success',
  `description` text NOT NULL,
  `button_text` varchar(100) NOT NULL DEFAULT 'Explore Our Programs',
  `background_image` varchar(500) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default hero content
INSERT INTO `hero_content` (`id`, `title`, `subtitle`, `description`, `button_text`, `background_image`) VALUES
(1, 'Welcome to Sunflower Academy', 'Nurturing Young Minds for Tomorrow''s Success', 'A place where children grow, learn, and flourish in a safe and inspiring environment. Our dedicated teachers and innovative programs ensure every child reaches their full potential.', 'Explore Our Programs', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80');

-- 2. Contact Information Table
CREATE TABLE IF NOT EXISTS `contact_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'Contact Information',
  `subtitle` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `map_url` text,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default contact info
INSERT INTO `contact_info` (`id`, `title`, `email`, `phone`, `address`, `map_url`) VALUES
(1, 'Contact Information', 'sfa2061@gmail.com', '(977) 01-5136321', 'Tarakeshwor- 06, KTM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4032.0402149898878!2d85.2998052!3d27.750960300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18cce4ffffe7%3A0x161276d0d897c665!2sSunflower%20Academy%20(English%20Medium%20SS)!5e1!3m2!1sen!2snp!4v1750232702113!5m2!1sen!2snp');

-- 3. About Content Table
CREATE TABLE IF NOT EXISTS `about_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'About Sunflower Academy',
  `subtitle` varchar(255) NOT NULL DEFAULT 'Cultivating Excellence in Education Since 1995',
  `description` text NOT NULL,
  `principal_message` text NOT NULL,
  `principal_name` varchar(100) NOT NULL DEFAULT 'Keshab Raj Sharma',
  `principal_image` varchar(500) NOT NULL DEFAULT '/principal.jpeg',
  `school_history` text NOT NULL,
  `mission` text NOT NULL,
  `vision` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default about content
INSERT INTO `about_content` (`id`, `title`, `subtitle`, `description`, `principal_message`, `principal_name`, `principal_image`, `school_history`, `mission`, `vision`) VALUES
(1, 'About Sunflower Academy', 'Cultivating Excellence in Education Since 1995', 'At Sunflower Academy, we believe every child is unique and deserves personalized attention to reach their full potential. Our nurturing environment combines academic excellence with character development.', 'Welcome you to Sunflower Academy — a place where young minds bloom and futures are built with care, vision, and dedication. At Sunflower Academy, we believe that every child is unique and full of potential.', 'Keshab Raj Sharma', '/principal.jpeg', 'Founded in 1995, Sunflower Academy has grown from a small neighborhood school to one of the region''s most respected educational institutions, serving over 800 students.', 'To provide quality education that nurtures intellectual curiosity, creativity, and character development in a safe and supportive environment.', 'To be a leading educational institution that prepares students to become confident, compassionate, and contributing members of society.');

-- 4. Facilities Content Table
CREATE TABLE IF NOT EXISTS `facilities_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'World-Class Facilities',
  `subtitle` varchar(255) NOT NULL DEFAULT 'Creating the perfect environment for learning and growth',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default facilities content
INSERT INTO `facilities_content` (`id`, `title`, `subtitle`) VALUES
(1, 'World-Class Facilities', 'Creating the perfect environment for learning and growth');

-- 5. Facilities Table
CREATE TABLE IF NOT EXISTS `facilities` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `icon` varchar(50) NOT NULL DEFAULT 'school',
  `display_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default facilities
INSERT INTO `facilities` (`id`, `title`, `description`, `image_url`, `icon`, `display_order`) VALUES
('computer-lab', 'Computer Laboratory', 'State-of-the-art computer lab with modern equipment and high-speed internet connectivity for digital learning and coding programs.', 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'computer', 0),
('science-lab', 'Science Laboratory', 'Well-equipped science laboratory with modern instruments and safety equipment for hands-on learning and experiments.', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'school', 1),
('library', 'Library & Learning Center', 'Extensive library with thousands of books, digital resources, and quiet study areas for focused learning and research.', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'users', 2);

-- 6. Activities Content Table
CREATE TABLE IF NOT EXISTS `activities_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'Beyond Classroom',
  `subtitle` varchar(255) NOT NULL DEFAULT 'Take a virtual tour of our Activities',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default activities content
INSERT INTO `activities_content` (`id`, `title`, `subtitle`) VALUES
(1, 'Beyond Classroom', 'Take a virtual tour of our Activities');

-- 7. Activities Table
CREATE TABLE IF NOT EXISTS `activities` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `display_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default activities
INSERT INTO `activities` (`id`, `title`, `image_url`, `display_order`) VALUES
('sports', 'Sports & Athletics', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 0),
('arts', 'Arts & Crafts', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 1),
('music', 'Music & Dance', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 2);

-- 8. Gallery Images Table
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(500) NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'general',
  `display_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default gallery images
INSERT INTO `gallery_images` (`id`, `title`, `description`, `image_url`, `category`, `display_order`) VALUES
('classroom-1', 'Modern Classroom', 'Our spacious and well-lit classrooms', 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'facilities', 0),
('students-learning', 'Students Learning', 'Engaged students in active learning', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'academic', 1),
('playground', 'School Playground', 'Safe and fun playground for children', 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'facilities', 2);

-- 9. Notifications Table
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','warning','success','error') NOT NULL DEFAULT 'info',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default notifications
INSERT INTO `notifications` (`id`, `message`, `type`, `isActive`) VALUES
('welcome', 'Welcome to Sunflower Academy! New admissions are now open for the academic year 2025.', 'info', 1),
('event', 'Annual Sports Day will be held on March 15th, 2025. All students and parents are invited!', 'success', 1);

-- Create indexes for better performance
CREATE INDEX idx_facilities_order ON facilities(display_order);
CREATE INDEX idx_activities_order ON activities(display_order);
CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_gallery_order ON gallery_images(display_order);
CREATE INDEX idx_notifications_active ON notifications(isActive);
