"""empty message

Revision ID: 3282ad46ceb5
Revises: 7ed2adcaa441
Create Date: 2024-01-09 14:02:58.460784

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3282ad46ceb5'
down_revision = '7ed2adcaa441'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index('ix_posts_created')
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)

    # ### end Alembic commands ###