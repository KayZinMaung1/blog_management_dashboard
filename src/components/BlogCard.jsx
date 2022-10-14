import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlog } from '../store/actions';
import { getReadableDateDisplay } from '../utils/convertToHumanReadableTime';
const BlogCard = ({ blog }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async (id) => {
        await dispatch(deleteBlog(id));
    }
    console.log("blog:", blog)
    return (
        <Paper elevation={1} >
            <Card >
                <CardMedia
                    component="img"
                    height="200"
                    image={blog.imageSrc}
                    alt="Blog Photo"
                />
                <CardContent sx={{ height: "300px" }}>
                    <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getReadableDateDisplay(blog.created_at)}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 2 }}>
                        <span dangerouslySetInnerHTML={{
                            __html: (blog?.description.length >= 200) ? blog?.description.substr(0, 250) + "..." : blog?.description
                        }} />
                    </Typography>

                </CardContent>

                <CardActions sx={{ justifyContent: "space-around" }}>
                    <Button size="small" sx={{ color: 'var(--primary-color)' }} onClick={() => navigate(`/admin/edit-blog-posts/${blog.id}`)}>
                        edit
                    </Button>
                    <Button size="small" sx={{ color: 'var(--primary-color)' }} onClick={() => handleDelete(blog.id)}>
                        delete
                    </Button>
                    <Button size="small" sx={{ color: 'var(--primary-color)' }} onClick={() => navigate(`/admin/show-blog-posts/${blog.id}`)}>
                        read more
                    </Button>
                </CardActions>
            </Card>
        </Paper >
    );
}

export default BlogCard;
