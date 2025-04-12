from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Funcionario(Base):
    __tablename__ = 'funcionarios'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    rut = Column(String(10), nullable=False)

    inspecciones_1 = relationship("Inspeccion", back_populates="fiscalizador_1", foreign_keys="Inspeccion.fiscalizador_1_id")
    inspecciones_2 = relationship("Inspeccion", back_populates="fiscalizador_2", foreign_keys="Inspeccion.fiscalizador_2_id")
