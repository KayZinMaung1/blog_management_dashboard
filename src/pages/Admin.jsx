import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./Dashboard";
import CreateBlogPost from "./blog_posts/CreateBlogPost";
import ShowBlogPosts from "./blog_posts/ShowBlogPosts";
import EditBlogPost from "./blog_posts/EditBlogPost";
import ShowBlogPostDetails from "./blog_posts/ShowBlogPostDetails";

const pages = [
    {
        name: 'Dashboard',
        route: 'dashboard',
        element: <Dashboard />
    },
    {
        name: 'Blog Posts',
        route: 'show-blog-posts',
        element: <ShowBlogPosts />
    },

];

const Admin = () => {
    return (
        <Box>
            <ResponsiveAppBar pages={pages} />
            <Box sx={{ bgcolor: 'white', mt: 15, padding: '1% 16%' }} component='main'>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/dashboard"></Navigate>}></Route>
                    {pages.map((page) => (
                        <Route path={page.route} element={page.element}></Route>
                    ))}
                    <Route path='/create-blog-post' element={<CreateBlogPost />}></Route>
                    <Route path='/edit-blog-posts/:id' element={<EditBlogPost />}></Route>
                    <Route path='/show-blog-posts/:id' element={<ShowBlogPostDetails />}></Route>
                </Routes>

            </Box>

        </Box>
    )
}
export default Admin;