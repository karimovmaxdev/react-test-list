import React, {useState} from 'react';
import styled from 'styled-components';
import { ListItemType } from '../data';

interface ListItemProps {
    item: ListItemType;
    removeEl?(id: number): void;
}

const ListItem: React.FC<ListItemProps> = React.memo(({ item, removeEl }) => {
    const [data, setData] = useState(item);
    const [rerenderKey, setRerenderKey] = useState(0);
    console.log('render:  ', item.id)
    const addChild = () => {
        const newData = {...data};
        const child = { id: Date.now(), children: [] }
        newData.children.push(child);
        setData(newData);
    };

    const removeChild = (id: number) => {
        const newData = {...data};
        newData.children = newData.children.filter(item => item.id != id);
        setData(newData);
        setRerenderKey(rerenderKey+1);
    };

    return (
        <ListItemContainer data-id={item.id}>
            <ItemText>Элемент {item.id}</ItemText>
            <ButtonContainer>
                <Button onClick={addChild}>Добавить наследника</Button>
                <Button onClick={() => removeEl && removeEl(item.id)} disabled={item.id === 1}>
                    Удалить элемент
                </Button>
            </ButtonContainer>
            {data.children.length > 0 && (
                <ChildrenContainer data-type={'container'}>
                    {data.children.map((child) => (
                        <ListItem data-id={child.id} key={child.id + rerenderKey} item={child} removeEl={removeChild} />
                    ))}
                </ChildrenContainer>
            )}
        </ListItemContainer>
    );
}, isEqual);
function isEqual(prev, next) {
    return JSON.stringify(prev.item) === JSON.stringify(next.item)
}
ListItem.displayName = 'ListItem';
export default ListItem;

// Стили
const ListItemContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const ChildrenContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const ItemText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
