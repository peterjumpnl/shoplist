import React from "react";
import Item from "./Item";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export interface ShoppingListProps {
  items: { id: number; text: string; checked: boolean }[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onReorder?: (newOrder: number[]) => void;
}

export default function ShoppingList({ items, onToggle, onDelete, onReorder }: ShoppingListProps) {
  if (!items.length) return <p style={{ opacity: 0.7, color: "#b0b0b0", marginTop: 32, fontSize: 18, textAlign: "center" }}>No items yet.</p>;

  function handleDragEnd(result: DropResult) {
    if (!result.destination || result.destination.index === result.source.index) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    if (onReorder) onReorder(newItems.map(i => i.id));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="shoplist-droppable">
        {(provided) => (
          <ul style={{ listStyle: "none", padding: 0, width: "100%" }} ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.85 : 1,
                      width: "100%"
                    }}
                  >
                    <Item
                      {...item}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      dragHandleProps={provided.dragHandleProps ?? undefined}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
