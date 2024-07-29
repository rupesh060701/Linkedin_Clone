import styled from "styled-components"
import { useState } from "react";

export default function PostModel(props) {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`not an image, the file is a ${typeof (image)}`);
            return;
        }

        setShareImage(image);
    }

    const reset = (e) => {
        setEditorText("");
        props.handelClick(e);

    }

    return (
        <>
            {
                props.showModel === "open" &&

                <Container>
                    <Content>
                        <Header>
                            <h2>Create a post</h2>
                            <button onClick={(event) => reset(event)}>
                                <img src="/images/cross.svg" alt="" />
                            </button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                <img src="/images/user.svg" alt=""></img>
                                <span>Name</span>
                            </UserInfo>
                            <Editor>
                                <textarea
                                    placeholder="What do you want to talk about?"
                                    value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    autoFocus={true}
                                >
                                </textarea>
                                <UploadImage>
                                    <input type="file" accept="image/jif,images/jpeg, image/png"
                                        name="image"
                                        id="file" style={{ display: "none" }}
                                        onChange={handleChange} />
                                    <p><label htmlFor="file">Select an image to show</label></p>
                                    {shareImage && <img src={URL.createObjectURL(shareImage)} alt=""></img>}
                                </UploadImage>
                            </Editor>
                        </SharedContent>
                        <SharedCreation>
                            <AttachAssets>
                                <AssetButton>
                                    <img src="/images/share-images.svg" alt=""></img>
                                </AssetButton>
                                <AssetButton>
                                    <img src="/images/share-video.svg" alt=""></img>
                                </AssetButton>

                            </AttachAssets>

                            <SharedComment>
                                <AssetButton>
                                    <img src="/images/share-comment.svg" alt="" />
                                    Anyone
                                </AssetButton>

                            </SharedComment>
                            <PostButton disable={!editorText ? true : false}>
                                Post
                            </PostButton>

                        </SharedCreation>
                    </Content>
                </Container>
            }
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    color: black;
    background-color: rgba(0,0,0,0.7);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
    padding: 12px;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px ;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        img{
            width: 20px;
            height: 20px;
            
        }
        svg,img{
            pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background-color: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    gap: 5px;
    
    svg,img{
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
    cursor: pointer;
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
    background-color: transparent;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
    img{
        width: 24px;
    }
`;

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    gap: 5px;
`;

const SharedComment = styled.div`
        padding-left: 8px;
        margin-right: auto;
        border-left: 1px solid rgba(0,0,0,0.15);
        ${AssetButton}{
            svg{
                margin-right: 5px;
            }
        }

`;

const PostButton = styled.div`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: #0a66c2;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    cursor: pointer;
    &:hover{
        background-color: #004182;
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align: center;

    img{
        width: 100%;
    }
`;