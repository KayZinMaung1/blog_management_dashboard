import { Box, Grid, Stack, Typography } from "@mui/material";
import BasicCard from "../components/BasicCard";
import ContainedButton from "../components/ContainedButton";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBlogs } from "../store/actions"

const Dashboard = () => {
   const navigate = useNavigate();
   const blogs = useSelector((state) => state.blog.blogs);
   const dispatch = useDispatch();
   const user = useSelector((state) => state.auth.user);

   useEffect(() => {
      const fetchData = () => {
         dispatch(getBlogs());
      }
      fetchData();
      return fetchData();
   }, [dispatch])


   return (
      <>

         <Grid container spacing={2}>
            <Grid item lg={10} md={8} xs={12}>
               <Box sx={{ width: "100%", bgcolor: 'white' }}>
                  <Stack spacing={1}>
                     <Typography
                        variant="h4"
                        component="h1"
                     >
                        <b>Welcome, {user.name}</b>
                     </Typography>
                     <Typography variant="body2" fontSize={16} fontWeight={200}>
                        Good to see you
                     </Typography>
                  </Stack>
               </Box>
            </Grid>
            <Grid item lg={2} md={4} xs={12}>
               <Box sx={{ width: "100%" }}>
                  <ContainedButton text="Add Post" startIcon={<AddIcon />} onClick={() => { navigate('/admin/create-blog-post') }} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Grid container spacing={2}>
                  <Grid item lg={4} md={6} xs={12}>
                     <BasicCard qty={blogs.length} label="Blog Posts" />
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
      </>
   )
}
export default Dashboard;