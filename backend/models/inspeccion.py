from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Inspeccion(Base):
    __tablename__ = 'inspeccion'

    id = Column(Integer, primary_key=True)
    fecha = Column(DateTime, nullable=False)
    centro_id = Column(Integer, ForeignKey('centro.id'), nullable=False)
    responsable_id = Column(Integer, ForeignKey('responsable_centro.id'), nullable=False)
    tipo_id = Column(Integer, ForeignKey('tipo_inspeccion.id'), nullable=False)
    fiscalizador_1_id = Column(Integer, ForeignKey('funcionarios.id'))
    fiscalizador_2_id = Column(Integer, ForeignKey('funcionarios.id'))
    observaciones = Column(Text)

    centro = relationship("Centro", back_populates="inspecciones")
    responsable = relationship("ResponsableCentro", back_populates="inspecciones")
    tipo = relationship("TipoInspeccion", back_populates="inspecciones")
    fiscalizador_1 = relationship("Funcionario", back_populates="inspecciones_1", foreign_keys=[fiscalizador_1_id])
    fiscalizador_2 = relationship("Funcionario", back_populates="inspecciones_2", foreign_keys=[fiscalizador_2_id])
