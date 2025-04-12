from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class ResponsableCentro(Base):
    __tablename__ = 'responsable_centro'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    rut = Column(String(10), nullable=False)
    cargo = Column(String(100))
    telefono = Column(String(20))
    email = Column(String(100))

    inspecciones = relationship("Inspeccion", back_populates="responsable")