from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class ResponsableCentro(Base):
    __tablename__ = 'responsable_centro'

    id = Column(Integer, primary_key=True)
    nombre = Column(String, nullable=False)
    rut = Column(String, nullable=False)
    cargo = Column(String)
    telefono = Column(String)
    email = Column(String)

    inspecciones = relationship("Inspeccion", back_populates="responsable")