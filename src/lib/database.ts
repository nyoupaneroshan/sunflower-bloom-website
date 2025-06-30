import Database from 'better-sqlite3';
import path from 'path';

// Database connection
let db: Database.Database | null = null;

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'database', 'sunflower.db');
    db = new Database(dbPath);
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // Initialize database with schema if it doesn't exist
    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  if (!db) return;
  
  // Read and execute schema file
  const fs = require('fs');
  const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
  
  try {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Hero Content functions
export function getHeroContent() {
  const db = getDatabase();
  return db.prepare('SELECT * FROM hero_content WHERE id = 1').get();
}

export function updateHeroContent(data: any) {
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE hero_content 
    SET title = ?, subtitle = ?, description = ?, hero_image = ?, 
        cta_button_text = ?, cta_button_link = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `);
  return stmt.run(data.title, data.subtitle, data.description, data.heroImage, data.ctaButton.text, data.ctaButton.link);
}

// About Content functions
export function getAboutContent() {
  const db = getDatabase();
  const aboutContent = db.prepare('SELECT * FROM about_content WHERE id = 1').get();
  const coreValues = db.prepare('SELECT * FROM core_values ORDER BY display_order').all();
  
  return {
    ...aboutContent,
    coreValues: coreValues
  };
}

export function updateAboutContent(data: any) {
  const db = getDatabase();
  
  // Update about content
  const aboutStmt = db.prepare(`
    UPDATE about_content 
    SET vision_content = ?, mission_content = ?, history_content = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `);
  aboutStmt.run(data.vision.content, data.mission.content, data.history.content);
  
  // Update core values
  if (data.coreValues && data.coreValues.values) {
    const deleteStmt = db.prepare('DELETE FROM core_values');
    deleteStmt.run();
    
    const insertStmt = db.prepare('INSERT INTO core_values (name, description, display_order) VALUES (?, ?, ?)');
    data.coreValues.values.forEach((value: any, index: number) => {
      insertStmt.run(value.name, value.description, index + 1);
    });
  }
  
  return { success: true };
}

// Contact functions
export function getContactInfo() {
  const db = getDatabase();
  return db.prepare('SELECT * FROM contact_info WHERE id = 1').get();
}

export function updateContactInfo(data: any) {
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE contact_info 
    SET title = ?, address = ?, phone = ?, email = ?, map_url = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `);
  return stmt.run(data.title, data.address, data.phone, data.email, data.mapUrl);
}

// Facilities functions
export function getFacilities() {
  const db = getDatabase();
  const content = db.prepare('SELECT * FROM facilities_content WHERE id = 1').get();
  const facilities = db.prepare('SELECT * FROM facilities ORDER BY display_order').all();
  
  return {
    title: content?.title || 'World-Class Facilities',
    subtitle: content?.subtitle || 'Creating the perfect environment for learning and growth',
    facilities: facilities.map(f => ({
      id: f.id,
      title: f.title,
      description: f.description,
      image: f.image_url,
      icon: f.icon
    }))
  };
}

export function updateFacilities(data: any) {
  const db = getDatabase();
  
  // Update content
  const contentStmt = db.prepare(`
    UPDATE facilities_content 
    SET title = ?, subtitle = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `);
  contentStmt.run(data.title, data.subtitle);
  
  // Update facilities
  const deleteStmt = db.prepare('DELETE FROM facilities');
  deleteStmt.run();
  
  const insertStmt = db.prepare('INSERT INTO facilities (title, description, image_url, icon, display_order) VALUES (?, ?, ?, ?, ?)');
  data.facilities.forEach((facility: any, index: number) => {
    insertStmt.run(facility.title, facility.description, facility.image, facility.icon, index + 1);
  });
  
  return { success: true };
}

// Activities functions
export function getActivities() {
  const db = getDatabase();
  const content = db.prepare('SELECT * FROM activities_content WHERE id = 1').get();
  const activities = db.prepare('SELECT * FROM activities ORDER BY display_order').all();
  
  return {
    title: content?.title || 'Beyond Classroom',
    subtitle: content?.subtitle || 'Take a virtual tour of our Activities',
    activities: activities.map(a => ({
      id: a.id,
      title: a.title,
      image: a.image_url
    }))
  };
}

export function updateActivities(data: any) {
  const db = getDatabase();
  
  // Update content
  const contentStmt = db.prepare(`
    UPDATE activities_content 
    SET title = ?, subtitle = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `);
  contentStmt.run(data.title, data.subtitle);
  
  // Update activities
  const deleteStmt = db.prepare('DELETE FROM activities');
  deleteStmt.run();
  
  const insertStmt = db.prepare('INSERT INTO activities (title, image_url, display_order) VALUES (?, ?, ?)');
  data.activities.forEach((activity: any, index: number) => {
    insertStmt.run(activity.title, activity.image, index + 1);
  });
  
  return { success: true };
}

// Gallery functions
export function getGalleryImages() {
  const db = getDatabase();
  const images = db.prepare('SELECT * FROM gallery_images ORDER BY display_order').all();
  
  return {
    images: images.map(img => ({
      id: img.id,
      title: img.title,
      description: img.description,
      url: img.image_url,
      category: img.category
    }))
  };
}

export function updateGalleryImages(data: any) {
  const db = getDatabase();
  
  // Clear existing images
  const deleteStmt = db.prepare('DELETE FROM gallery_images');
  deleteStmt.run();
  
  // Insert new images
  const insertStmt = db.prepare('INSERT INTO gallery_images (title, description, image_url, category, display_order) VALUES (?, ?, ?, ?, ?)');
  data.images.forEach((image: any, index: number) => {
    insertStmt.run(image.title, image.description, image.url, image.category, index + 1);
  });
  
  return { success: true };
}

// Notifications functions
export function getNotifications() {
  const db = getDatabase();
  const notifications = db.prepare('SELECT * FROM notifications ORDER BY created_at DESC').all();
  
  return {
    notifications: notifications.map(n => ({
      id: n.id,
      title: n.title,
      content: n.content,
      type: n.type,
      priority: n.priority,
      isActive: Boolean(n.is_active),
      created_at: n.created_at
    }))
  };
}

export function updateNotifications(data: any) {
  const db = getDatabase();
  
  // Clear existing notifications
  const deleteStmt = db.prepare('DELETE FROM notifications');
  deleteStmt.run();
  
  // Insert new notifications
  const insertStmt = db.prepare('INSERT INTO notifications (title, content, type, priority, is_active, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)');
  data.notifications.forEach((notification: any) => {
    insertStmt.run(
      notification.title || notification.message,
      notification.content || notification.message,
      notification.type || 'info',
      notification.priority || 'medium',
      notification.isActive ? 1 : 0
    );
  });
  
  return { success: true };
}

// Education functions
export function getEducationContent() {
  const db = getDatabase();
  const content = db.prepare('SELECT * FROM education_content WHERE id = 1').get();
  const gradeLevels = db.prepare('SELECT * FROM grade_levels ORDER BY display_order').all();
  
  return {
    curriculum: {
      title: content?.curriculum_title || 'Curriculum',
      description: content?.curriculum_description || ''
    },
    mentoring: {
      title: content?.mentoring_title || 'Personalized Mentoring',
      description: content?.mentoring_description || ''
    },
    classrooms: {
      title: content?.classrooms_title || 'Interactive Classrooms',
      description: content?.classrooms_description || ''
    },
    counseling: {
      title: content?.counseling_title || 'Student Counseling',
      description: content?.counseling_description || ''
    },
    beyondBooks: {
      title: content?.beyond_books_title || 'Learning Beyond Books',
      description: content?.beyond_books_description || ''
    },
    grades: {
      title: content?.grades_title || 'Grades Offered',
      levels: gradeLevels.map(g => ({
        level: g.level,
        grades: g.grades
      }))
    }
  };
}