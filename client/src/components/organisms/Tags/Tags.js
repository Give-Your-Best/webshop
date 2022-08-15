import React, { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { PlusOutlined } from '@ant-design/icons';
import { Tooltip, Select } from 'antd';
import { StyledTag } from './Tags.styles';
import { tagColours } from '../../../utils/constants';
import { updateItemTags, deleteTagFromItem, updateUserTags, deleteTagFromUser } from '../../../services/tags';

export const Tags = ({updateId, updateType, tagList, availableTags}) => {
    const { token } = useContext(AppContext);
    const [tags, setTags] = useState(tagList);
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef(null);

    //remove tag from item
    const handleClose = async (removedTag) => {
      if (updateType === 'item') {
        await deleteTagFromItem(updateId, removedTag.id, token);
      } else if (updateType === 'user') {
        await deleteTagFromUser(updateId, removedTag.id, token);
      }
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    };

    const showInput = (e) => {
      setInputVisible(true);
    };

    //add tag to item
    const handleInputConfirm = async (tagId, tag) => {
      if (tagId && !tags.some(t=>t._id === tagId) && !tags.some(t=>t.value === tagId)) {

        if (updateType === 'item') {
          let test = await updateItemTags(updateId, tagId, token);
        } else if (updateType === 'user') {
          await updateUserTags(updateId, tagId, token);
        }
        setTags([...tags, tag]);
      }

      setInputVisible(false);
    };

    useEffect(() => {

      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);

    return (
      <>
        {tags.map((tag, index) => {
          if (tag.label) {
            tag.name = tag.label
          }

          const isLongTag = tag.name.length > 20;
          const tagElem = (
            <StyledTag
              key={tag.label}
              color={tagColours[index]}
              closable={true}
              onClose={() => handleClose(tag)}
            >
              <span>{isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}</span>
            </StyledTag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Select
            options={availableTags.map((t) => {return {'label': t.name, 'value': t._id, 'key': t._id}})}
            style={{ width: '150px' }}
            onChange = {handleInputConfirm}
          />
        )}
        {(!inputVisible && tags.length < 10) && (
          <StyledTag onClick={showInput}>
            <PlusOutlined /> New Tag
          </StyledTag>
        )}
      </>
    );
};