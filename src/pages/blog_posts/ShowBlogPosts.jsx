import { Box, Grid, Pagination, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import ContainedButton from "../../components/ContainedButton";
import BlogCard from "../../components/BlogCard";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getBlogsWithPagination } from "../../store/actions";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successDeleteMessage } from "../../utils/message";
import successNotify from "../../components/SuccessNotify";
import errorNotify from "../../components/ErrorNotify";

const ShowBlogPosts = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog);
    const status = useSelector((state) => state.status);
    const error = useSelector((state) => state.error);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);

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
        dispatch(getBlogsWithPagination(perPage, currentPage));
    }, [dispatch, perPage, currentPage])


    return (
        <>
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item xl={10} lg={9} md={8} xs={12}>
                    <Box sx={{ width: "100%", bgcolor: 'white' }}>
                        <Typography
                            variant="h4"
                            component="h1"
                        >
                            <b>Blogs</b>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xl={2} lg={3} md={4} xs={12}>
                    <Box sx={{ width: "100%" }}>
                        <ContainedButton text="Add Post" startIcon={<AddIcon />} onClick={() => { navigate('/admin/create-blog-post') }} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: "100%", bgcolor: 'white', minHeight: "73vh", backgroundColor: "white" }}>
                        <Grid container spacing={2} >

                            {blog.blogs.map((blog) => (

                                <Grid item xl={4} lg={6} md={6} xs={12} key={blog.id}>
                                    <BlogCard blog={blog} />
                                </Grid>
                            ))}

                        </Grid>
                    </Box>

                </Grid>

            </Grid>
            <Box display="flex" justifyContent="center">
                <Pagination count={blog.totalPages} shape="rounded" onChange={(e, page) => { setCurrentPage(page) }} size="large" sx={{ mt: "10px" }} />
            </Box>
        </>
    )
}
export default ShowBlogPosts;