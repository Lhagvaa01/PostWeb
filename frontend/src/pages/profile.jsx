import React, { useState, useEffect,useContext } from "react";

import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { UserContext } from '../context/UserContext';
import {
  Avatar,
  Card,
  AutoComplete,
  Input,
  Button,
  Modal,
  Form,
  List,
} from "antd";
// import { Comment } from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  CommentOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Comment } from "@ant-design/compatible";

import moment from "moment";

export default function Profile() {
  
  // const { user } = useContext(UserContext);
  const { Search } = Input;
  const { Meta } = Card;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openD, setOpenD] = useState(false);

  const [SelectBooks, setSelectBooks] = useState();
  const showModal = () => {
    console.log("modal");

    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleSaveBook();
    setIsModalOpen(false);
  };
  const handleEdit = () => {
    handleEditBook();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [bookId, setBookId] = useState("");
  const showModalDel = (book) => {
    console.log("book");
    console.log(book);
    setBookId(book._id);
    setModalText(book.title);
    setOpen(true);
  };

  const showModalEdit = (book) => {
    console.log("book");
    console.log(book);
    const id = book._id;
    const title = book.title;
    setBookId(id);
    setModalText(title);
    setOpenEdit(true);
  };
  const handleDeleteBook = () => {
    setLoading(true);
    console.log(bookId);
    axios
      .delete(`http://localhost:5000/books/${bookId}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Амжилттай устгалаа!", { variant: "success" });
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Устгахад алдаа гарлаа", { variant: "success" });
        console.log(error);
      });
  };

  const handleOkDel = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    handleDeleteBook();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancelDel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const { TextArea } = Input;
  const getRandomInt = (max, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const searchResult = (query) =>
    new Array(getRandomInt(5))
      .join(".")
      .split(".")
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                Found {query} on{" "}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {category}
                </a>
              </span>
              <span>{getRandomInt(200, 100)} results</span>
            </div>
          ),
        };
      });
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(2);
  const [description, setDescription] = useState("setPublishYear");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  };

  useEffect(() => {
    setLoading(true);
    const userData = getUserDataFromLocalStorage();
    if (userData) {
      setUser(userData);
    }
    axios
      .get(`http://localhost:5000/books`)
      .then((response) => {
        const data = response.data.data.filter((post) => post.description === userData._id);
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    axios
      .get(`http://localhost:5000/comment`)
      .then((response) => {
        setCommentsDb(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const textChange = (e) => {
    setTitle(e.target.value);
    setAuthor(e.target.value);
  };
  const textChangeEdit = (e) => {
    setTitle(e.target.value);
    setAuthor(e.target.value);
    setModalText(e.target.value);
  };

  const handleSaveBook = () => {
    const data = {
      title,
      author : user && user.name,
      description : user && user._id,
      publishYear,
    };
    setLoading(true);

    console.log(data);
    axios
      .post("http://localhost:5000/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Амжилттай", { variant: "success" });
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Алдаа гарлаа", { variant: "error" });
        console.log(error);
      });
  };

  const handleEditBook = () => {
    const data = {
      title,
      author,
      description,
      publishYear,
    };
    setLoading(true);

    console.log(data);
    console.log(`http://localhost:5000/books/${bookId}`);
    axios
      .put(`http://localhost:5000/books/${bookId}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Номын шинэчлэлт амжилттай", { variant: "success" });
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Алдаа гарлаа!", { variant: "error" });
        console.log(error);
      });
  };

  const onSearchComment = (value, _e, info) => console.log(info?.source, value);

  const { TextAreaComment } = Input;

  const CommentList = ({ comments }) => {
    // Preprocess the comments data
    const processedComments = comments.map(comment => {
      // Assuming each comment has a 'content' property
      const commentContent = comment.content.toString().split(":")[0];
      return { ...comment, content: commentContent };
    });
  
    return (
      <List
        dataSource={processedComments}
        header={`${processedComments.length} ${processedComments.length > 1 ? "replies" : "reply"}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
      />
    );
  };
  

  const [comments, setComments] = useState([]);
  const [commentsDb, setCommentsDb] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmitCom = (book, e) => {
    if (!value) {
      return;
    }

    setTitle(book.title);
    setAuthor(book.author);
    setSubmitting(true);
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");

    const id = book._id;
    const author = user.name;
    const avatar = "https://api.dicebear.com/7.x/miniavs/svg?seed=8";
    const content = e + " : " + book._id;
    const datetime = formattedDateTime;
    console.log(id);

    const data = {
      author,
      avatar,
      content,
      datetime,
    };
    setLoading(true);

    console.log(data);
    axios
      .post(`http://localhost:5000/comment`, data)
      .then((val) => {
        setLoading(false);
        setCommentsDb(val.data.data);
        console.log(val.data.data);
        enqueueSnackbar("Амжилттай", { variant: "success" });
        // navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Алдаа гарлаа!", { variant: "error" });
        console.log(error);
      });

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        {
          author: user.name,
          avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
        ...comments,
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
    setValue(e.target.value);
  };
  
  const handleGetData = () =>{
    console.log(commentsDb);
  }
  
  

  
  return (
    <div className="pt-10 w-full justify-center">
      <div className="flex w-full  justify-center">
        <div className="flex md:w-2/3 w-full min-w-553 mx-10 shadow-md p-5 my-5 rounded bg-white">
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          <Input
            placeholder=" Шинэ пост бичих"
            type="primary "
            // style={{ background: "" }}
            onClick={showModal}
          />

          <Modal
            title="Постоо бичнэ үү!"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <TextArea rows={4} onChange={textChange} />
            <br />
          </Modal>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="justify-center md:w-2/3 w-full mx-10   bg-white rounded p-10 drop-shadow-md">
          <div>
            {/* <div>
              User: {user && user.name} 
            </div>
            <button onClick={handleGetData}>GET User Data</button> */}
            <div className="grid gap-5 w-full ">
              {books != null ? (
                books.map((book) => (
                  <div className="grid border rounded-xl">
                    <Modal
                      title="Засах"
                      open={openEdit}
                      onOk={handleEdit}
                      onCancel={handleCancelEdit}
                    >
                      <TextArea
                        rows={4}
                        value={modalText}
                        onChange={textChangeEdit}
                      />
                      <br />
                    </Modal>
                    <div className="flex">
                    <Card
                      style={{
                        width: "100%",
                      }}
                      actions={[
                        <EditOutlined onClick={() => showModalEdit(book)} />,
                        <CommentOutlined />,
                        <DeleteOutlined onClick={() => showModalDel(book)} />,
                      ]}
                    >
                      <Modal
                        title={`Устгахдаа итгэлтэй байна уу?`}
                        open={open}
                        onOk={handleOkDel}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancelDel}
                      >
                        <p>{modalText}</p>
                      </Modal>
                      <Meta
                        avatar={
                          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                        }
                        title={book.author}
                        description={book.title}
                      />
                    </Card>
                    </div>
                    <div className="pt-5">
                      <div>
                        {commentsDb.length > 0 && (
                          <div className="p-5">
                            <CommentList
                              comments={commentsDb.filter(
                                (com) =>
                                  com.content.toString().split(" : ")[1] === book._id.toString()
                              )}
                            />
                          </div>
                        )}
                      </div>
                      <Search
                        placeholder="input search text"
                        onChange={handleChange}
                        value={value}
                        onSearch={(e) => handleSubmitCom(book, e)}
                        enterButton={
                          <Button
                            type="primary"
                            style={{ background: "blue" }}
                            icon={<SendOutlined />}
                          />
                        }
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div>Empty</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

