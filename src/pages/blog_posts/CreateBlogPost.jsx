import { Box, Stack, TextField, Typography } from "@mui/material";
import ImageUpload from "../../components/ImageUpload";
import ContainedButton from "../../components/ContainedButton";
import React, { useEffect, useState } from 'react';

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../store/actions";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successCreateMessage } from "../../utils/message";
import successNotify from "../../components/SuccessNotify";
import errorNotify from "../../components/ErrorNotify";


const CreateBlogPost = () => {
  const [fileList, setFileList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    if (error.message !== null) {
      errorNotify(error.message);
    }
    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      successNotify(successCreateMessage);
      setFileList([]);
      setTitle("");
      setEditorState(EditorState.createEmpty());
    }
    return () => status.success;
  }, [status.success]);



  const onEditorStateChange = (editorState) => {
    const rawContentState = convertToRaw(
      editorState.getCurrentContent()
    );
    const markup = (draftToHtml(rawContentState));
    setDescription(markup);
    setEditorState(editorState)
  };

  const handleSave = async () => {

    const formData = new FormData();
    formData.append("imageFile", fileList[0]?.originFileObj);
    formData.append("title", title);
    formData.append("description", description);
    await dispatch(createBlog(formData));

  }

  return (

    <Stack spacing={3}>
      <ToastContainer height="5px" />
      <Box sx={{ bgcolor: 'white' }}>
        <Typography
          variant="h4"
          component="h1"

        >
          <b>Add New Post</b>
        </Typography>
      </Box>
      <Box sx={{ bgcolor: 'white', width: "250px" }}>
        <ImageUpload fileList={fileList} setFileList={setFileList} />
      </Box>
      <Box sx={{ bgcolor: 'white' }}>
        <TextField id="standard-basic" label="Title" variant="standard" sx={{ width: '100%' }} onChange={(e) => setTitle(e.target.value)} value={title} />
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
export default CreateBlogPost;