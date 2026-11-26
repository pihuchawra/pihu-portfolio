const portfolioSlides = document.querySelectorAll('.native-slide');

function matchSlideTextWidths(slide, slideWidth) {
  for (const run of slide.querySelectorAll('.slide-run')) {
    const browserWidth = parseFloat(getComputedStyle(run).width);
    const deckWidth = slideWidth * Number(run.dataset.slideWidth) / 100;
    if (browserWidth > 0 && deckWidth > 0) {
      run.style.setProperty('--slide-text-scale', deckWidth / browserWidth);
    }
  }
}

document.fonts.ready.then(() => {
  const observer = new ResizeObserver(entries => {
    for (const { target, contentRect } of entries) {
      matchSlideTextWidths(target, contentRect.width);
    }
  });
  for (const slide of portfolioSlides) {
    observer.observe(slide);
  }
});
