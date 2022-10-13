import { Box, Stack, TextField, Typography } from "@mui/material";
import ImageUpload from "../../components/ImageUpload";
import ContainedButton from "../../components/ContainedButton";
import React, { useEffect, useState } from 'react';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useSelector, useDispatch } from 'react-redux';
import { editBlog, getBlog } from "../../store/actions";
import { useParams } from "react-router-dom";
import draftToHtml from "draftjs-to-html";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successEditMessage } from "../../utils/message";
import successNotify from "../../components/SuccessNotify";
import errorNotify from "../../components/ErrorNotify";


const EditBlogPost = () => {
  const blog = useSelector((state) => state.blog.blog);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const [editorState, setEditorState] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (status.success) {
      successNotify(successEditMessage);
    }
    return () => status.success;
  }, [status.success]);

  useEffect(() => {
    if (error.message !== null) {
      errorNotify(error.message);
    }
    return () => error.message;
  }, [error.message]);


  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTitle(blog?.title);
    setDescription(blog?.description);
    setFileList([
      {
        uid: blog?.id,
        name: blog?.title,
        status: "done",
        url: blog?.imageSrc,
      },
    ]);
  }, [blog]);


  useEffect(() => {
    let markup;
    if (blog?.description !== undefined) {
      markup = (convertFromHTML(blog.description));
    }
    if (markup) {
      const contentState = ContentState?.createFromBlockArray(markup?.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [blog])

  const onEditorStateChange = (editorState) => {
    const rawContentState = convertToRaw(
      editorState.getCurrentContent()
    );
    const markup = draftToHtml(rawContentState);
    setDescription(markup);
    setEditorState(editorState);
  };

  const handleSave = async () => {

    const formData = new FormData();
    //original data
    formData.append("id", blog.id)
    formData.append("imageName", blog.imageName);
    formData.append("createdDate", blog.createdDate);

    //updated data
    formData.append("title", title);
    formData.append("description", description);
    if (fileList[0]?.status !== "done") {  //when new image upload,
      formData.append("imageFile", fileList[0]?.originFileObj);
    }

    await dispatch(editBlog(id, formData))
  }


  return (
    <Stack spacing={3}>
      <ToastContainer />
      <Box sx={{ bgcolor: 'white' }}>
        <Typography
          variant="h4"
          component="h1"

        >
          <b>Edit Blog Post</b>
        </Typography>
      </Box>
      <Box sx={{ bgcolor: 'white', width: "250px" }}>
        <ImageUpload fileList={fileList} setFileList={setFileList} />
      </Box>
      <Box sx={{ bgcolor: 'white' }}>
        <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Title" variant="standard" sx={{ width: '100%' }} placeholder={blog.title} onChange={(e) => setTitle(e.target.value)} />
      </Box>

      <Box sx={{ bgcolor: 'white', minHeight: '35vh', border: '1px solid var(--medium-grey)' }}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />

      </Box>
      <Box sx={{ bgcolor: 'white', width: "15%", border: '1px solid var(--medium-grey)' }}>
        <ContainedButton text="Save" onClick={handleSave} />
      </Box>

    </Stack>

  )
}
export default EditBlogPost;