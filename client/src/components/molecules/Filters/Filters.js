import React, { useRef } from "react";
import { FiltersWrapper, ClearFilters, Accordian, StyledForm, StyledSubmitButton } from './Filters.styles';
import { clothingSizeOptions, shoeSizeOptions, colours as coloursList } from '../../../utils/constants';
import { StyledCheckboxGroup } from '../EditForm/EditForm.styles';
import { Formik } from 'formik';
import { Collapse } from 'antd';

export const Filters = ({setClothingSizes, setColours, setShoeSizes, setFilters}) => {

    const { Panel } = Collapse;
    const formikRef = useRef();
    setFilters(false);

    const handleOk = (values) => {
        setClothingSizes(values.clothingSize);
        setShoeSizes(values.shoeSize);
        setColours(values.colour);
        setFilters(true);

        //collapse filters accordian
        document.querySelectorAll('.ant-collapse-header').forEach((c) => {
            if (c.getAttribute('aria-expanded') === 'true') {
                c.click()
            }
        })

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
            <StyledForm>
                <Accordian>
                    <Panel header="Size">
                    <StyledCheckboxGroup name="clothingSize" options={clothingSizeOptions}/>
                    </Panel>

                    <Panel header="Shoe Size">
                    <StyledCheckboxGroup name="shoeSize" options={shoeSizeOptions}/>
                    </Panel>

                    <Panel header="Colours">
                    <StyledCheckboxGroup name="colour" options={coloursList}/>
                    </Panel>

                    <StyledSubmitButton>Apply Filters</StyledSubmitButton>
                </Accordian>
            </StyledForm>
        </Formik>
        <ClearFilters onClick={handleClear}>x Clear all Filters</ClearFilters>
    </FiltersWrapper>
  );
};
