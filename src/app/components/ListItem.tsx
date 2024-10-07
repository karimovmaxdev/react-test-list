import React, {useState} from 'react';
import styled from 'styled-components';
import { ListItemType } from '../data';

interface ListItemProps {
    item: ListItemType;
    emitRemove?(id: number): void;
}

const ListItem: React.FC<ListItemProps> = React.memo(({ item, emitRemove }) => {
    const [id] = useState<number>(item.id);
    const [children, setChildren] = useState(item.children);

    // консоль для проверки кол-ва рендеров
    console.log('render:  ', item.id)
    const addChild = () => {
        setChildren(prev => [...prev, {id: Date.now(), children: []}])
    };

    const removeChild = (childId: number) => {
        setChildren(prev => prev.filter(it => it.id !== childId))
    };


    // если задача подразумевала сохранить древо в переменную,тогда для этого
    // можно распарсить DOM и вытянуть все айдишники и их потомков, используя data-id.
    //
    // В ТЗ такого условия не было, поэтому не стал делать.

    return (
        <ListItemContainer data-id={id}>
            <ItemText>Элемент {id}</ItemText>
            <ButtonContainer>
                <Button onClick={addChild}>Добавить наследника</Button>
                <Button onClick={() => emitRemove && emitRemove(id)} disabled={id === 1}>
                    Удалить элемент
                </Button>
            </ButtonContainer>
            {children.length > 0 && (
                <ChildrenContainer data-type={'children'}>
                    {children.map((child) => (
                        <ListItem data-id={child.id} key={child.id} item={child} emitRemove={removeChild} />
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
