import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Observation pages">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="page-indicator">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

export default Pagination;
