import React from "react"
import PropTypes from "prop-types"
import Modal from "react-responsive-modal"

import { ModalContent, Button } from "../styles"

export default function WinLoseModal({ stage, restartGame }) {
  const isOpen = stage !== "running"

  return (
    <div data-testid="modal">
      <Modal open={isOpen} onClose={restartGame}>
        <ModalContent>
          {stage === "game_won" ? `You won! 🎉` : `You lost 💀`}
          <Button type="button" onClick={restartGame}>
            Restart Game
          </Button>
        </ModalContent>
      </Modal>
    </div>
  )
}

WinLoseModal.propTypes = {
  stage: PropTypes.string.isRequired,
  restartGame: PropTypes.func.isRequired,
}
