import React, { useRef } from "react";
import { FiltersWrapper, ClearFilters, Accordian, FilterItem } from './Filters.styles';
import { clothingSizeOptions, shoeSizeOptions, colours as coloursList } from '../../../utils/constants';
import { StyledLabel, StyledSubmitButton, StyledCheckboxGroup } from '../EditForm/EditForm.styles';
import { Formik, Form } from 'formik';
import { Collapse } from 'antd';

export const Filters = ({setClothingSizes, setColours, setShoeSizes, clothingSizes, shoeSizes, colours, setFilters}) => {

    const { Panel } = Collapse;
    const formikRef = useRef();
    setFilters(false);

    const handleOk = (values) => {
        setClothingSizes(values.clothingSize);
        setShoeSizes(values.shoeSize);
        setColours(values.colour);
        setFilters(true);

        //collapse filters accordian
        document.querySelector('.ant-collapse-header').click();

        return true
    }

    const handleClear = () => {
        setShoeSizes([]);
        setClothingSizes([]);
        setColours([]);
        formikRef.current?.resetForm();
        setFilters(true);
    }

  return (
    <FiltersWrapper>
        <Formik
        initialValues={{ clothingSize: [], shoeSize: [], colour: []}}
        onSubmit={handleOk}
        innerRef={formikRef}
        >
            <Form>
                <Accordian>
                    <Panel header="Filters">
                    <StyledLabel>Clothing size
                    <StyledCheckboxGroup name="clothingSize" options={clothingSizeOptions}/></StyledLabel>

                    <StyledLabel>Shoe size 
                    <StyledCheckboxGroup name="shoeSize" options={shoeSizeOptions}/></StyledLabel>

                    <StyledLabel>Colours 
                    <StyledCheckboxGroup name="colour" options={coloursList}/></StyledLabel>

                    <StyledSubmitButton>Apply Filters</StyledSubmitButton>
                    </Panel>
                </Accordian>
            </Form>
        </Formik>
        {(clothingSizes.length > 0) && <FilterItem>Clothing sizes: {clothingSizes.join(', ')}</FilterItem>}
        {(shoeSizes.length > 0) && <FilterItem>Shoe sizes: {shoeSizes.join(', ')}</FilterItem>}
        {(colours.length > 0) && <FilterItem>Colours: {colours.join(', ')}</FilterItem>}
        <ClearFilters onClick={handleClear}>x Clear all Filters</ClearFilters>
    </FiltersWrapper>
  );
};
