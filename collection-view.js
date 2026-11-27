const viewControls = document.querySelector('.collection-view');
const projectCards = document.querySelector('#collection-projects');

if (viewControls && projectCards) {
  const viewButtons = viewControls.querySelectorAll('[data-project-view]');
  const cards = [...projectCards.querySelectorAll('.card')];
  let layoutFrame;
  let previousColumnCount;

  function layoutCollage() {
    if (projectCards.dataset.view !== 'grid') return;

    const gridStyle = getComputedStyle(projectCards);
    const columnCount = Number(gridStyle.getPropertyValue('--collage-columns'));
    const gap = parseFloat(gridStyle.columnGap);
    if (columnCount !== previousColumnCount) {
      delete projectCards.dataset.collage;
      previousColumnCount = columnCount;
    }
    const nextRow = Array(columnCount).fill(1);
    const heights = cards.map(card => Math.ceil(card.getBoundingClientRect().height));

    cards.forEach((card, index) => {
      const column = nextRow.indexOf(Math.min(...nextRow));
      const height = Math.max(1, heights[index]);
      card.style.setProperty('--collage-column', column + 1);
      card.style.setProperty('--collage-row', `${nextRow[column]} / span ${height}`);
      nextRow[column] += height + Math.round(gap);
    });
    projectCards.dataset.collage = '';
  }

  function scheduleLayout() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(layoutCollage);
  }

  const observer = new ResizeObserver(scheduleLayout);
  for (const card of cards) observer.observe(card);
  scheduleLayout();

  for (const button of viewButtons) {
    button.addEventListener('click', () => {
      projectCards.dataset.view = button.dataset.projectView;
      for (const option of viewButtons) {
        option.setAttribute('aria-pressed', String(option === button));
      }
      scheduleLayout();
    });
  }
  viewControls.hidden = false;
}
