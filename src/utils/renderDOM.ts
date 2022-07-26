import Block from './Block';

export default function render(query: string, component: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    throw new Error('fail queryselector');
  }
  const blockContent = component.getContent();
  if (root && blockContent) {
    root.appendChild(blockContent);
    component.dispatchComponentDidMount();
  }

  return root;
}
