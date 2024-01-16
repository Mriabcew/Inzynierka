import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import NotFound from '../components/NotFound';
import SellerInfo from '../components/SellerInfoComponent';
import './style.css';
import LogoBarComponent from '../components/LogoBarComponent';
import axios from 'axios';
import { Button, Modal, Box } from '@mui/material';

function ItemPage() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const storedUserId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`https://localhost:7211/Auction/${itemId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setProduct(null);
      });
  }, [itemId]);

  const handleDeleteAuction = () => {
    axios.delete(`https://localhost:7211/Auction/Delete/${itemId}`)
      .then(response => {
        console.log('Aukcja została usunięta:', response.data);
        navigate('/');
        setDeleteModalOpen(false);
      })
      .catch(error => {
        console.error('Błąd podczas usuwania aukcji:', error);
        setDeleteModalOpen(false);
      });
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <LogoBarComponent />
      <div className="item-page">
        {product ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>{product.name}</h2>
              <div>
                {product.userId === storedUserId && (
                  <>
                    <Button>
                      <Link to={`/edit-auction/${itemId}`}>Edytuj aukcję</Link>
                    </Button>
                    <Button onClick={handleOpenDeleteModal}
                    sx={{color:'red'}}>
                      Usuń aukcję
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div>
              <ProductDetails product={product} />
              <SellerInfo userId={product.userId} />
            </div>
          </div>
        ) : (
          <NotFound />
        )}

<Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius:'1em',
            }}
          >
            <div className="delete-modal">
              <p>Czy na pewno chcesz usunąć aukcję?</p>
              <div className="modal-buttons" style={{
                display: "flex", gap: "1em", justifyContent: "center",}}>
                <Button onClick={handleDeleteAuction} variant="contained" color="error">
                  Tak, usuń
                </Button>
                <Button onClick={handleCloseDeleteModal} variant="contained">
                  Anuluj
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ItemPage;