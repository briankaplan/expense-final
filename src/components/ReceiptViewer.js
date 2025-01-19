import React, { useState, useRef } from 'react';
import { Download, ZoomIn, ZoomOut, RotateCw, X } from 'lucide-react';

const ReceiptViewer = ({ expense, onClose }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(expense.receipt_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${expense.id}.${blob.type.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };

  const handleDragStart = (e) => {
    if (e.target === imageRef.current) {
      setIsDragging(true);
      setDragPosition({
        x: e.clientX - imageRef.current.offsetLeft,
        y: e.clientY - imageRef.current.offsetTop
      });
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragPosition.x;
    const newY = e.clientY - dragPosition.y;
    
    if (imageRef.current) {
      imageRef.current.style.left = `${newX}px`;
      imageRef.current.style.top = `${newY}px`;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute inset-4 md:inset-10 bg-card rounded-lg shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-semibold">Receipt Viewer</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-secondary rounded-md"
              title="Download Receipt"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-secondary rounded-md"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-secondary rounded-md"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-secondary rounded-md"
              title="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-md"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden relative p-4">
          <div 
            className="w-full h-full flex items-center justify-center"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <img
              ref={imageRef}
              src={expense.receipt_url}
              alt="Receipt"
              className="max-h-full object-contain cursor-move"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                position: 'relative',
                transition: isDragging ? 'none' : 'transform 0.2s ease'
              }}
              draggable={false}
            />
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{new Date(expense.transaction_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Merchant</p>
              <p className="font-medium">{expense.merchant}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{expense.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-medium">${expense.amount.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="font-medium">{expense.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptViewer; 