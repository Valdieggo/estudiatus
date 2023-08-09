import { useEffect, useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BannedModal from "../../components/Error/ModalBaned"; // Importa el componente de modal para usuarios baneados
import ErrorModal from "../../components/Error/GeneralError"; // Importa el componente de modal para otros errores
import Layout from "../../components/Layout/Layout";
import { set } from "mongoose";

const BanError = () => {
  const router = useRouter();
  const { error } = router.query;
  const [showBannedModal, setShowBannedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [idBan, setIdBan] = useState(null);

  useEffect(() => {
    // Muestra el modal correspondiente en función del tipo de error
    if (error) {
      // Muestra el modal correspondiente en función del tipo de error
      if (error.startsWith("BANNED/")) {
        
        const banIdFromQuery = error.substring("BANNED/".length); 
        console.log(banIdFromQuery)// Extraer el ID del ban del query string
        setIdBan(banIdFromQuery);
        setShowBannedModal(true);
      } else {
        setShowErrorModal(true);
      }
    }
   
  }, [error]);

  const handleCloseModals = () => {
    // Cierra ambos modales cuando el usuario hace clic en el botón de cerrar
    setShowBannedModal(false);
    setShowErrorModal(false);
  };

 

  return (
    <Layout>
    <Box>
      {/* Modal para usuarios baneados */}
      <BannedModal isOpen={showBannedModal} onClose={handleCloseModals} idBan={idBan} />

      {/* Modal para otros errores */}
      <ErrorModal isOpen={showErrorModal} onClose={handleCloseModals} errorMessage={error} />
    </Box>
    </Layout>
  );
};

export default BanError;