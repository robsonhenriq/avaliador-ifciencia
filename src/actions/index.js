export const salvarAvaliacao = avaliacao => ({
    type: 'SALVAR_AVALIACAO',
    payload: avaliacao
  });

export const limparAvaliacoes = () => ({
  type: 'LIMPAR_AVALIACOES'
});
