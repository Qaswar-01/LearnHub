/**
 * PROJECT IDENTIFIER
 * ==================
 * 
 * Project: Interactive Learning Platform
 * Created: ${new Date().toISOString()}
 * 
 * This file helps identify the current project and prevent confusion with previous projects
 * like grocify or yum. It contains unique identifiers that Vite and browsers can use to
 * distinguish this project from others.
 */

// Export a unique identifier for this project
export const PROJECT_ID = 'interactive-learning-platform-' + Math.random().toString(36).substring(2, 15);

// Export the project name
export const PROJECT_NAME = 'Interactive Learning Platform';

// Export the creation timestamp
export const CREATED_AT = new Date().toISOString();

// This helps ensure the correct project is loaded
console.log(`Loading project: ${PROJECT_NAME} (${PROJECT_ID})`);