from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class TipoInspeccion(Base):
    __tablename__ = 'tipo_inspeccion'

    id = Column(Integer, primary_key=True)
    nombre = Column(String, unique=True, nullable=False)

    inspecciones = relationship("Inspeccion", back_populates="tipo")