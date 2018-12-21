The following tree shows up how each component should be architetured

````````````````````````````````
Component/Overlay/Page -----  
|              \            \   
|               \            \  
Elements       Layout      Backend  
|      \  
|       \   
UI     Layout  
|  
|  
Layout 
````````````````````````````````

## Component/Overlay/Page
**Visual or not** elements where the routes and adresses shoud point to, and also where it talks with the backend(through some store/service or directly). It only groups up elements in some layout. 
It can exist on a per-game basis, but it doesn't need to.

## Elements
These are **visual** elements that depends on each game display/layout

## UI
These are **visual** components with some functionality that helps create elements but that can be reused for more than one element. Like the counter, which is not necessarily only a text, it has the odometer functionality

## Layout
These are **not visual** components, which means they don't have any "shape", not a text, a image or anything. Its responsibility is to change the style of one or more children to fill an specific need.