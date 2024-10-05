// pagesController.js
import { Page } from '../models/page.js';

const fetchHome = async (req, res) => {
    // Find the 'home' page
    const homePage = await Page.findOne({ slug: 'home' });
    // Respond with the home page content
    res.json({ page: homePage });
};

const fetchAbout = async (req, res) => {
    // Find the 'about' page
    const aboutPage = await Page.findOne({ slug: 'about' });
    // Respond with the about page content
    res.json({ page: aboutPage });
};

const fetchServices = async (req, res) => {
    // Find the 'services' page
    const servicesPage = await Page.findOne({ slug: 'services' });
    // Respond with the services page content
    res.json({ page: servicesPage });
};

const fetchCareers = async (req, res) => {
    // Find the 'careers' page
    const careersPage = await Page.findOne({ slug: 'careers' });
    // Respond with the careers page content
    res.json({ page: careersPage });
};

// Create a page
const createPage = async (req, res) => {
    const { title, slug, content } = req.body;

    // Create a new page
    const page = await Page.create({
        title,
        slug,
        content
    });

    // Respond with the new page
    res.json({ page });
};

// Update a page by slug
const updatePage = async (req, res) => {
    const slug = req.params.slug;
    const { title, content } = req.body;

    // Update the page
    await Page.findOneAndUpdate({ slug }, { title, content });

    // Find the updated page
    const updatedPage = await Page.findOne({ slug });

    // Respond with the updated page
    res.json({ page: updatedPage });
};

// Delete a page by slug
const deletePage = async (req, res) => {
    const slug = req.params.slug;

    // Delete the page
    await Page.deleteOne({ slug });

    // Respond
    res.json({ success: 'Page deleted' });
};

export { fetchHome, fetchAbout, fetchServices, fetchCareers, createPage, updatePage, deletePage };
