# API

* [Draggable](#draggable)

* [Resizable](#resizable)

### Draggable

| Props                | Type                      | Default | Description                                        |
|----------------------|---------------------------|---------|----------------------------------------------------|
| default&nbsp;*              | {<br/>&nbsp;&nbsp;&nbsp;&nbsp;x: number;<br/>&nbsp;&nbsp;&nbsp;&nbsp;y: number;<br/>}  | null    | The values that determinate the position of the component in the screen. |
| scale                | number                    | 1       | The scale of the parent component (container). This will ajust the translation of the componente in relation to the mouse on the screen to match the scale of the container, so you can scale the container to make it responsive and the draggable component will move according to it's parent scale. |
| onDragStop           | (event,&nbsp;position)&nbsp;=>&nbsp;void | null    | The callback function that will be executed when the drag was stopped (onMouseUp). It recives two arguments: event and position. The dom event object of the inner component and the position the component was when dropped, respectively. | 

### Resizable

| Props                | Type                                 | Default | Description                                        |
|----------------------|--------------------------------------|---------|----------------------------------------------------|
| default&nbsp;*              | {<br/>&nbsp;&nbsp;&nbsp;&nbsp;width: number;<br/>&nbsp;&nbsp;&nbsp;&nbsp;height: number;<br/>}    | null    | The values that determinate the size of the component. |
| scale                | number                               | 1       | The scale of the parent component (container). This will ajust the resizing of the componente in relation to the mouse on the screen to match the scale of the container, so you can scale the container to make it responsive and the resizable component will resize according to it's parent scale. |
| onResizeStop         | (event,&nbsp;size)&nbsp;=>&nbsp;void                | null    | The callback function that will be executed when the resize was stopped (onMouseUp). It recives two arguments: event and size. The dom event object of the inner component and the size that the component had when the resize was finished, respectively. | 

Every component implements all of the mouse event props in the React's SytheticEvent type and can be found [here](https://reactjs.org/docs/events.html#mouse-events).

\* required prop