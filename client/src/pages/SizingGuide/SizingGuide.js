import { Container } from '../../components/atoms';
import { Heading, SubHeader, SizesTable } from './SizingGuide.styles';
import {
  columns,
  clothingSizes,
  shoesSizes,
  childrenShoesSizes,
} from './tabledata';

export const SizingGuide = () => {
  return (
    <Container>
      <Heading>Sizing Guide</Heading>
      <SubHeader>Clothing</SubHeader>
      <SizesTable
        showHeader={true}
        columns={columns.concat([{ title: '', dataIndex: 's', key: 's' }])}
        rowKey={(record) => record._id}
        pagination={false}
        dataSource={clothingSizes}
      />
      <SubHeader>Shoes</SubHeader>
      <SizesTable
        showHeader={true}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
        dataSource={shoesSizes}
      />{' '}
      <SubHeader>Children Shoes</SubHeader>
      <SizesTable
        showHeader={true}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
        dataSource={childrenShoesSizes}
      />
    </Container>
  );
};
