import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { getBlog } from "../../store/actions";
import { useParams } from "react-router";
import { getReadableDateDisplay } from "../../utils/convertToHumanReadableTime";


const ShowBlogPostDetails = () => {
    const blog = useSelector((state) => state.blog.blog);
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        dispatch(getBlog(id))
    }, [dispatch, id])

    console.log("Blog:", blog)

    const ImagePaper = styled(Paper)(({ theme }) => ({
        height: "35vh",
        width: "50%",
        position: "relative",
        backgroundImage: `url(${blog.photoUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }));

    return (
        <>
            <Stack spacing={3} alignItems="left">
                <Box>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ mb: 1 }}
                    >
                        <b>{blog.title}</b>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {getReadableDateDisplay(blog.created_at)}
                    </Typography>
                </Box>
                <ImagePaper />
                <Typography variant="body1" sx={{ lineHeight: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                </Typography>
            </Stack>
        </>
    )
}
export default ShowBlogPostDetails;