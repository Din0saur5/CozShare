"""empty message

Revision ID: 27b100f32f03
Revises: e6f1ac4a6153
Create Date: 2024-01-25 17:51:12.800302

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '27b100f32f03'
down_revision = 'e6f1ac4a6153'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)

    # ### end Alembic commands ###
