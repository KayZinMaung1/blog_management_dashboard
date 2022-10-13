import { Box, Grid, Pagination, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import ContainedButton from "../../components/ContainedButton";
import BlogCard from "../../components/BlogCard";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBlogs } from "../../store/actions";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successDeleteMessage } from "../../utils/message";
import successNotify from "../../components/SuccessNotify";
import errorNotify from "../../components/ErrorNotify";

const ShowBlogPosts = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blog.blogs);
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        if (status.delete) {
            successNotify(successDeleteMessage);
        }
        return () => status.delete;
    }, [status.delete]);

    useEffect(() => {
        if (error.message !== null) {
            errorNotify(error.message);
        }
        return () => error.message;
    }, [error.message]);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch])



    return (
        <>
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item lg={10} md={8} xs={12}>
                    <Box sx={{ width: "100%", bgcolor: 'white' }}>
                        <Typography
                            variant="h4"
                            component="h1"
                        >
                            <b>Blog Posts</b>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={2} md={4} xs={12}>
                    <Box sx={{ width: "100%" }}>
                        <ContainedButton text="Add Post" startIcon={<AddIcon />} onClick={() => { navigate('/admin/create-blog-post') }} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        {blogs.map((blog) => (

                            <Grid item lg={4} md={6} xs={12} key={blog.id}>
                                <BlogCard blog={blog} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} p={2}>
                        <Pagination count={10} shape="rounded" onChange={(e, page) => { console.log("page:", page) }} />
                    </Grid>
                </Grid>

            </Grid>



        </>
    )
}
export default ShowBlogPosts;