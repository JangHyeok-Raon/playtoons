import { Body2, Body5, Border1pxVioletBlue } from '@/styledMixins';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleCheck, faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import {TOAST_TYPE} from '@COMMON/constant';
        

/**
  <Toast 
    width={"400px"} 
    minHeight={"48px"}
    title={"information text"} 
    text={"辺ようむる海視リずンぼ周場スネ心7場情サムマ事果ずられ情高びぴら急必のにわ陸"} 
    type={TOAST_TYPE.success} />
 * @param {*} props 
 * @version 1.0.0
 * @author 이현국
 */
export default function Toast(props) {
  const { title, text, type } = props;
  const containerPadding = text ? "14px 16px 12px 16px" : "14px 16px 14px 16px";
  const flexContainerMarginBototm = text && "12px";

  const getIcon = () => {
    switch( type ){
      default: //info
        return <FontAwesomeIcon 
                  icon={faCircleInfo}
                  style={{ 
                      width: "16px", 
                      height: "16px", 
                      marginRight: "8px", 
                      color: "var(--violet-blue)" }}
                  />;
      case TOAST_TYPE.success:
        return <FontAwesomeIcon 
                icon={faCircleCheck}
                style={{ 
                    width: "16px", 
                    height: "16px", 
                    marginRight: "8px", 
                    color: "var(--apple)" }}
                />;
      case TOAST_TYPE.error:
        return <FontAwesomeIcon 
                icon={faCircleXmark}
                style={{ 
                    width: "16px", 
                    height: "16px", 
                    marginRight: "8px", 
                    color: "var(--status-red)" }}
                />;
    }
  }

  const getBackgroundColor = () => {
    switch( type ){
      default:  //info
        return "var(--selago)";
      case TOAST_TYPE.success:
        return "var(--green-01)";
      case TOAST_TYPE.error:
        return "var(--red-01)";
    }//switch
  }

  const getBorder = () => {
    switch( type ){
      default:  //info
        return "1px solid var(--violet-blue)";
      case TOAST_TYPE.success:
        return "1px solid var(--apple)";
      case TOAST_TYPE.error:
        return "1px solid var(--status-red)";
    } //switch
  }

  return (
    <Container
      width={props.width}
      minHeight={props.minHeight}
      padding={containerPadding}
      border={getBorder()}
      backgroundColor={getBackgroundColor()} >

      <FlexContainer
        marginBottom={flexContainerMarginBototm}>
        {getIcon()}
        <Title>{title}</Title>
      </FlexContainer>

      {
        text && <Text>{text}</Text>
      }
    </Container>
  )
}

const FlexContainer = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.marginBottom};
`;

const Container = styled.div`
  ${Border1pxVioletBlue}
  width: ${(props) => props.width};
  min-height: ${(props) => props.minHeight};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  background-color:  ${(props) => props.backgroundColor};;
  border-radius: 4px;
`;

const Title = styled.div`
  ${Body2}
  color: var(--vulcan);
`;

const Text = styled.div`
  ${Body5}
  margin-left: 24px;
  color: var(--bright-gray);
`;