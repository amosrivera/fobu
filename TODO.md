High priority
===================
- Draft support
- Fix columns height
- Work on the design
- Add missing fields to the DB
* module description
* required field
* hidden field
* 

UX
========
- Comprehensive tab titles
- Loader: thin line over the top
- Video modal with examples or custom guided tours for specific examples
- Count number of fields
- comprehensive tour

Low priority
==================
- Fix responsive layout
- Performance bottle necks

Completed
=========
x Set controls disabled when no element is selected
// no central controls exist anymore
x Scroll to the added item when not in the viewport
// no need to since the item is created when dropped. hence
// already in the viewport
x Add dragging support for the tools
x Unit testing 
// this is not happening. ever.
// unit testing require an obscene amount of set up and noddle
// apocalypse fighting
x Fix tag nesting <div> <element> <select> for fields
x Clean CSS
x Fix HTML5 semantics when possible 
x Angular dupes error on duplicated select options 
x Happy face along with "you have not added any fields message"
// used an arrow instead
x Use ng-class instead of jQuerying it
x Use animated background for selected elements
// A css3 background was used instead
x Guided tour at the beginning of a poll
x Favicons
x Reproduce scope bug in directives. 
  x Take out repetition in directives
  x File issue if bug in Angular
x Deleting is buggy after reordering the elements
