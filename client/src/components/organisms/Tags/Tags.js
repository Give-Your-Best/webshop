import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tooltip, Select } from 'antd';
import { StyledTag } from './Tags.styles';
import { tagColours } from '../../../utils/constants';

export const Tags = ({tagList, availableTags}) => {

    const [tags, setTags] = useState(tagList);
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef(null);

    const handleClose = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    };

    const showInput = (e) => {
      setInputVisible(true);
    };

    const handleInputConfirm = (e) => {
      if (e && tags.indexOf(e) === -1) {
        setTags([...tags, e]);
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

          const isLongTag = tag.length > 20;
          const tagElem = (
            <StyledTag
              key={tag}
              color={tagColours[index]}
              closable={true}
              onClose={() => handleClose(tag)}
            >
              <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
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
            options={availableTags}
            style={{ width: '100px' }}
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