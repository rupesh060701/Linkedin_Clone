import styled from "styled-components";
import PostModel from "./PostModel";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const Main = (props) => {

  const [showModel, setShowModel] = useState("close");
  useEffect(() => {
    props.getArticles();
  }, []);

  const handelClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModel) {
      case "open":
        setShowModel("close");
        break;
      case "close":
        setShowModel("open");
        break;
      default:
        setShowModel("close");
        break;
    }
  }

  return <Container>
    <ShareBox>
      <div>
        {
          props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />
        }

        <button onClick={handelClick} disabled={props.loading ? true : false}>Start a Post</button>
      </div>

      <div>
        <button>
          <img src="/images/photo-icon.png" alt="" />
          <span>Media</span>
        </button>

        <button>
          <img src="/images/event-icon.png" alt="" />
          <span>Event</span>
        </button>

        <button>
          <img src="/images/article-icon.png" alt="" />
          <span>Write Article</span>
        </button>
      </div>
    </ShareBox>
    <Content>
      {
        props.loading && <img src="/images/gear-spinner.svg" alt=""></img>
      }
      {
        props.articles.map((article, key) => (


          <Article key={key}>
            <SharedActor>
              <a href="/">
                <img src={article.actor.image} alt=""></img>
                <div>
                  <span>{article.actor.title}</span>
                  <span>{article.actor.description}</span>
                  <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                </div>
              </a>
              <button>
                <img src="/images/ellipsis.svg" alt=""></img>
              </button>
            </SharedActor>
            <Description>{article.description}</Description>
            <SharedImg>
              <a href="/">
                {
                  !article.sharedImg && article.video ?
                    <ReactPlayer width={"100%"} url={article.video} />
                    :article.sharedImg && <img alt="" src={article.sharedImg}></img>
                }
              </a>
            </SharedImg>
            <SocialCounts>
              <li>
                <button>
                  <img src="/images/thumb-img.svg" alt="" />
                  <img src="/images/clap-img.svg" alt="" />
                  <span>75</span>
                </button>
              </li>
              <li>
                {article.comments}
              </li>
            </SocialCounts>
            <SocialActions>
              <button>
                <img src="/images/like.svg" alt="" />
                <span>Like</span>
              </button>

              <button>
                <img src="/images/comment.svg" alt="" />
                <span>Comments</span>
              </button>

              <button>
                <img src="/images/repost.svg" alt="" />
                <span>Repost</span>
              </button>

              <button>
                <img src="/images/send.svg" alt="" />
                <span>Send</span>
              </button>
            </SocialActions>
          </Article>
        ))
      }
    </Content>
    <PostModel showModel={showModel} handelClick={handelClick} />

  </Container>;
};





const Container = styled.div`
  grid-area: main;
`;


const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom:8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 0 8px;
  background: white;
  gap:5px;

  div{
    button{
      outline: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      font-size: 18px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      font-weight: 500;
    }
    &:first-child{
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img{
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button{
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 35px;
        color: #958b7b;
        text-align: left;
      }
    }

    &:nth-child(2){
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding-bottom: 4px;
      
      img{
        width: 30px;

      }
      span{
        color: #70b5f9;
        font-weight: 600;
      }
    }
  }

`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 10px 0 0px 8px ;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 48px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a{
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img{
      width: 48px;
      height: 48px;
    }
    &>div{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span{
        text-align: left;
        &:first-child{
          font-size: 14px;
          font-weight: 700;
          color: rgba(0,0,0,1);
        }
        &:nth-child(n+1){
          font-size: 12px;
          color: rgba(0,0,0,0.6);
        }
      }
    }
  }
  button{
    position: absolute;
    border: none;
    outline: none;
    right: 12px;
    top: 0;
    background: transparent;
    
    img{
      width: 24px;
      }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0,0,0,0.9);
  font-size: 18px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img{
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0 16px;
  padding: 8px 0px ;
  line-height: 1.3;
  border-bottom: 1px solid #e9e5df;
  button{
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    img{
      width: 24px;
    }
    span{
      font-weight: 600;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    background-color: transparent;
    border: none;
    img{
      width: 30px;
    }
    @media (min-width:768px) {
      span{
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  &>img{
    width: 30px;
  }
`;

Main.propTypes = {
  getArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  }
}
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
